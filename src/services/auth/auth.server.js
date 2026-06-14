import { createClient } from "../../lib/server";

export const getUser = async () => {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null
    return user
}