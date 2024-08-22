import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabaseBrowser } from '@utils/supabase/browser';

const initExercise = {
    id: "",
    name: "",
    solution: "",
};

//export default function useRandomExercise(timeStamp:number) {
export default function useRandomTestExercise() {    
    const queryClient = useQueryClient();

    const fetchNewExercise = async () => {
        const supabase = supabaseBrowser();
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session?.user) {
            const { data: exerciseData } = await supabase.rpc('get_test_exercise');
            
            return exerciseData;
        }
        return initExercise;
    };

    const query = useQuery({
        queryKey: ['randomTestExercise'],
        queryFn: fetchNewExercise,
    });

    const refetchExercise = () => {
        queryClient.invalidateQueries({ queryKey: ['randomTestExercise'] });
    };

    return { ...query, refetchExercise, fetchNewExercise };
}
