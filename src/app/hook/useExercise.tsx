import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseBrowser } from '@/lib/supabase/browser';

const initExercise = {
    id: "",
    topic_id: "",
    type_id: "",
    difficulty_id: "",
    solution: "",
    url: "",
    title: "",
};

//export default function useRandomExercise(timeStamp:number) {
export default function useRandomExercise() {    
    const queryClient = useQueryClient();

    const fetchNewExercise = async () => {
        const supabase = supabaseBrowser();
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
            const { data: exerciseData } = await supabase.rpc('getrandomexercise');
            return exerciseData;
        }
        return initExercise;
    };

    const query = useQuery({
        queryKey: ['randomExercise'],
        queryFn: fetchNewExercise,
    });

    const refetchExercise = () => {
        queryClient.invalidateQueries({ queryKey: ['randomExercise'] });
    };

    return { ...query, refetchExercise, fetchNewExercise };
}
