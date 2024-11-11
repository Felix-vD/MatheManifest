import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseBrowser } from '@utils/supabase/browser';

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
export default function getUnsolvedExercise() { 
    const queryClient = useQueryClient();

    const fetchUnsolvedExercise = async () => {
        const supabase = supabaseBrowser();
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
            
            const { data: exerciseData } = await supabase.rpc('get_unsolved_exercise', {
                user_uuid: sessionData.session.user.id  // Assuming 'user_id' is the parameter expected by your function
            });
            
            return exerciseData;

        }
        return initExercise;
    };

    const query = useQuery({
        //key to identify the query in the cache
        queryKey: ['randomUnsolvedExercise'],
        queryFn: fetchUnsolvedExercise,
    });

    const refetchExercise = () => {
        queryClient.invalidateQueries({ queryKey: ['randomUnsolvedExercise'] });
    };

    return { ...query, refetchExercise, fetchUnsolvedExercise };
}
