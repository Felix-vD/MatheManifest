import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

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
        const supabase = createClient();
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
            const { data: exerciseData } = await supabase.rpc('get_random_exercise');
            console.log("dis da exercise data", exerciseData);
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
