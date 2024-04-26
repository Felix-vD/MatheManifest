import { useQuery } from '@tanstack/react-query';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function useRandomExercise() {
    return useQuery({
        queryKey: ['randomExercise'],
        queryFn: async () => {
            console.log("HELLOOOO!");
            const supabase = supabaseBrowser();
            const { data: exercise, error} = await supabase.rpc('getrandomexercise');
            console.log(exercise);
            if (error) {
                console.error('Error fetching random exercise:', error);
                return null;
            }
            return exercise;
        }
    });
}
