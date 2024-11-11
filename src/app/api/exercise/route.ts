// app/api/avatar/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // Import your server-side Supabase client

export async function POST(req: Request) {
  const supabase = createClient();
  const { userId, exerciseId, status } = await req.json(); // Expect userId and newAvatarUrl in request body

  const { error } = await supabase
    .from('userprogress')
    .insert({   user_id: userId,
                exercise_id: exerciseId,
                exercise_status: status
     })
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
