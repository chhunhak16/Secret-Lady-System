import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmhvojlsojlgysdfeeqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHZvamxzb2psZ3lzZGZlZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODM0NDcsImV4cCI6MjA2ODU1OTQ0N30.TxD4I0AX0PX3k7ZhPIMmqtI6R7HAJ98ca7pWqOQAhko';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);