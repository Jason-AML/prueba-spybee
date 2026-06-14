"use client";
import Image from "next/image";
import Form from "../../components/auth/Form";
import useRedirectAuth from "@/app/hooks/useRedirectAuth";
import styles from "../AuthPages.module.scss";

const Page = () => {
  useRedirectAuth();
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.hero}>
          <Image
            src="/spybee-auth.webp"
            alt="Fondo de bienvenida de SpyBee"
            aria-hidden="true"
            fill
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Prueba Tecnica</h1>
            <p className={styles.heroSubtitle}>Gestión de incidencias</p>
          </div>
        </div>

        <Form mode="login" />
      </div>
    </div>
  );
};

export default Page;
