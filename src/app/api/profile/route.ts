// app/api/avatar/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // Import your server-side Supabase client

export async function POST(req: Request) {
  const supabase = createClient();
  const { userEmail, display_name, grade, calculator } = await req.json(); // Expect userId and newAvatarUrl in request body

  const { error } = await supabase
    .from('profiles')
    .update({   display_name: display_name,
                grade: grade,
                calculator: calculator
     })
    .eq('email', userEmail);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
