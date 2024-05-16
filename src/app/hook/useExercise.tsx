import { useQuery } from '@tanstack/react-query';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { url } from 'inspector';
import { title } from 'process';
const initExercise = {
    id:"",
    topic_id:"",
    type_id:"",
    difficulty_id:"",
    solution:"",
    url:"",
    title:"",
}


export default function useRandomExercise(timeStamp:number) {
    
    return useQuery({
        queryKey: ['randomExercise', timeStamp],
        queryFn: async () => {
            const supabase = supabaseBrowser();
            const{data}= await supabase.auth.getSession();
            if(data.session?.user){
                const { data: exercise } = await supabase.rpc('getrandomexercise');
                return exercise;
            }
            return initExercise;
        }
    })
}
