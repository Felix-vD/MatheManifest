// // app/api/total-solved/route.ts
// import { NextResponse } from 'next/server';
// import { createClient } from '@/utils/supabase/server'; // Import your server-side Supabase client

// export async function POST(req: Request) {
//   const supabase = createClient();
//   const { userEmail } = await req.json(); // Expect userEmail in request body

//   const { data, error } = await supabase
//     .from('rankingprogress')
//     .select('*')
//     .eq('id', userEmail) // Assuming 'id' is the user's UUID or email
//     .single();

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   if (!data) {
//     return NextResponse.json({ error: 'No data found for this user' }, { status: 404 });
//   }

//   return NextResponse.json({ total_solved: data.total_solved });
// }
