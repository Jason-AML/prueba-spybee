"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import IncidentMap from "../../map/IncidentMap";
import { toLatLng } from "@/utils/coordinate";
import { useIncidentStats } from "@/app/hooks/useIncidentStats";
import { useIncidentContext } from "@/context/incidentsContext";
import { useAuth } from "@/context/AuthContext";
const fechaActual = new Date().toISOString().split("T")[0];
const PRIORITY_OPTIONS = [
  {
    value: "low",
    label: "Baja",
    dotColor: "#639922",
    activeClass: "bg-[#EAF3DE] border-[#639922] text-[#3B6D11]",
  },
  {
    value: "medium",
    label: "Media",
    dotColor: "#BA7517",
    activeClass: "bg-[#FAEEDA] border-[#BA7517] text-[#854F0B]",
  },
  {
    value: "high",
    label: "Alta",
    dotColor: "#E24B4A",
    activeClass: "bg-[#FCEBEB] border-[#E24B4A] text-[#A32D2D]",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function NewIncident({ onClose, onSubmit }) {
  const { user } = useAuth();
  const getName = user.email.split("@")[0];
  const fileInputRef = useRef(null);
  const { value, setValue } = useIncidentContext();
  const { people, byType, projects } = useIncidentStats(value);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    owner: "",
    project: "",
    dueDate: "",
    priority: "low",
  });

  const [assignees, setAssignees] = useState([]);

  const [observers, setObservers] = useState([]);
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
    description: "",
  });

  const handleGetLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = toLatLng(pos.coords);
      if (!coords) return;
      setLocation((prev) => ({ ...prev, ...coords }));
    });
  }, []);

  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);

  const [media, setMedia] = useState([]);

  // --- Handlers ---

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const removeAssignee = (id) =>
    setAssignees((prev) => prev.filter((u) => u.id !== id));
  const addAssignee = (user) => setAssignees((prev) => [...prev, user]);
  const addObserver = (user) => setObservers((prev) => [...prev, user]);
  const onChangeSelect = (e, options, currentList, fn) => {
    const selected = options.find((p) => p.id === e.target.value);
    if (!selected) return;
    if (currentList.some((a) => a.id === selected.id)) return;
    fn(selected);
  };
  const removeObserver = (id) =>
    setObservers((prev) => prev.filter((u) => u.id !== id));

  const handleFiles = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
          ? "video"
          : "doc",
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setMedia((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id) =>
    setMedia((prev) => prev.filter((f) => f.id !== id));
  const selectedType = Object.entries(byType).find(
    ([name]) => name === form.type,
  );
  const selectedProject = projects.find((p) => p.id === form.project);
  const handleSubmit = () => {
    const newIncident = {
      ...form,
      id: crypto.randomUUID(),
      sequenceId: String(value.length + 1).padStart(4, "0"),
      order: value.length + 1,
      assignees,
      type: {
        key: form.type,
        name: form.type,
      },
      owner: {
        id: user.id,
        name: getName,
        email: user.email,
        avatarUrl: user.avatarUrl ?? null,
      },
      project: selectedProject,
      observers,
      coordinates: { lat: location.lat, lng: location.lng },
      locationDescription: location.description,
      media,
      status: "open",
      approval: false,
      deleted: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setValue((prev) => [newIncident, ...prev]);
    onSubmit?.(newIncident);
    onClose?.();
    console.log(newIncident);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-neutral-200 dark:border-neutral-700">
        <div>
          <h2 className="text-base font-medium text-neutral-900 dark:text-white">
            Nueva incidencia
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Los campos marcados con * son obligatorios
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto">
        {/* Título */}
        <Field label="Título" required>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ej. Fuga en montante nivel 6–7"
            className={inputCls}
          />
        </Field>

        {/* Descripción */}
        <Field label="Descripción" required>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Describe la incidencia con el mayor detalle posible..."
            className={`${inputCls} resize-y`}
          />
        </Field>

        {/* Categoría + Fecha */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Categoría" required>
            <select
              name="type"
              value={form.categoria}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="" disabled>
                Seleccionar categoría
              </option>
              {Object.keys(byType).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Fecha de vencimiento" required>
            <input
              type="date"
              name="dueDate"
              min={fechaActual}
              value={form.dueDate}
              onChange={handleChange}
              className={inputCls}
            />
          </Field>
        </div>
        {/*Projects*/}
        <Field label="Proyecto" required>
          <select
            name="project"
            value={form.project}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="" disabled>
              Seleccionar proyecto
            </option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        {/* Prioridad */}
        <Field label="Prioridad" required>
          <div className="flex gap-2">
            {PRIORITY_OPTIONS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, priority: p.value }))
                }
                className={`flex-1 cursor-pointer flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all
                    ${
                      form.priority === p.value
                        ? p.activeClass
                        : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: p.dotColor }}
                />
                {p.label}
              </button>
            ))}
          </div>
        </Field>

        {/* Asignados */}
        <Field label="Asignados" required>
          <select
            value=""
            onChange={(e) => onChangeSelect(e, people, assignees, addAssignee)}
            className={inputCls}
          >
            <option value="" disabled>
              Seleccionar asignado
            </option>
            {people.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <UserChipGroup users={assignees} onRemove={removeAssignee} />
        </Field>

        {/* Observadores */}
        <Field label="Observadores" required>
          <select
            value=""
            onChange={(e) => onChangeSelect(e, people, observers, addObserver)}
            className={inputCls}
          >
            <option value="" disabled>
              Seleccionar Observadores
            </option>
            {people.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <UserChipGroup users={observers} onRemove={removeObserver} />
        </Field>

        {/* Ubicación */}
        <Field label="Ubicación" required>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={location.lat}
              onChange={(e) =>
                setLocation((p) => ({ ...p, lat: e.target.value }))
              }
              disabled
              placeholder="Latitud"
              className={inputCls}
            />
            <input
              type="text"
              value={location.lng}
              onChange={(e) =>
                setLocation((p) => ({ ...p, lng: e.target.value }))
              }
              disabled
              placeholder="Longitud"
              className={inputCls}
            />
          </div>
          <input
            type="text"
            value={location.description}
            onChange={(e) =>
              setLocation((p) => ({ ...p, description: e.target.value }))
            }
            placeholder="Descripción del lugar (Ej. Nivel 11 - eje E3)"
            className={`${inputCls} mb-2`}
          />
          {/* Map placeholder — reemplazar con <Map> de Mapbox */}
          <IncidentMap
            incident={
              location.lat && location.lng
                ? { coordinates: { lat: location.lat, lng: location.lng } }
                : null
            }
          />
        </Field>

        {/* Archivos adjuntos */}
        <Field label="Archivos adjuntos" required>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border border-dashed border-neutral-200 dark:border-neutral-700 rounded-lg py-4 flex flex-col items-center gap-1 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.25 5.25 0 011.076 10.972"
              />
            </svg>
            <p className="text-sm text-neutral-500">
              Arrastra archivos o haz clic para seleccionar
            </p>
            <span className="text-xs text-neutral-400">
              PNG, JPG, MP4, PDF — máx. 10 MB
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            onChange={handleFiles}
            className="hidden"
          />

          {media.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {media.map((f) => (
                <div
                  key={f.id}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
                >
                  {f.preview ? (
                    <img
                      src={f.preview}
                      alt={f.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125V5.625m0 12.75V5.625m0 0A1.125 1.125 0 013.375 4.5h17.25c.621 0 1.125.504 1.125 1.125m0 0v12.75m0 0h-1.5M20.625 19.5c.621 0 1.125-.504 1.125-1.125V5.625M11.25 8.625h1.5"
                        />
                      </svg>
                      <span className="text-[10px] text-neutral-400 text-center line-clamp-1">
                        {f.name}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    aria-label="Quitar archivo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-5 py-2 text-sm font-medium text-white bg-amber-300 rounded-lg hover:bg-amber-500 cursor-pointer transition-colors flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Crear incidencia
        </button>
      </div>
    </>
  );
}

// ---- Sub-componentes ----

const inputCls =
  "w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 outline-none focus:border-[#378ADD] focus:ring-2 focus:ring-[#378ADD]/15 transition-all";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function UserChipGroup({ users, onRemove }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {users.map((u) => (
        <div
          key={u.id}
          className="flex items-center gap-1.5 pl-1 pr-2.5 py-1 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-700 dark:text-neutral-300"
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0"
            style={{ background: u.bg, color: u.text }}
          >
            {getInitials(u.name)}
          </div>
          {u.name}
          <button
            type="button"
            onClick={() => onRemove(u.id)}
            className="ml-0.5 text-neutral-400 hover:text-neutral-600 leading-none"
            aria-label={`Quitar a ${u.name}`}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1 border border-dashed border-neutral-200 dark:border-neutral-700 rounded-full text-xs text-neutral-400 hover:border-neutral-400 transition-colors"
      >
        + Agregar
      </button>
    </div>
  );
}
