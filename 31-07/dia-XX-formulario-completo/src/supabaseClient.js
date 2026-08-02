import { createClient } from '@supabase/supabase-js'

const supabaseUrl = https://yzfahymnfmuxpqsnxkqo.supabase.co
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// DIAGNÓSTICO: Esto te dirá en la consola de tu navegador si las llaves se están leyendo
console.log("🔍 URL de Supabase detectada:", supabaseUrl);
console.log("🔍 ¿Clave Anon detectada?:", supabaseAnonKey ? "SÍ (Tiene datos)" : "NO (Está vacía)");

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Error crítico: Las credenciales de Supabase no están configuradas en el archivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey)