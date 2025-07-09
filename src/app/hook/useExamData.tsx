import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';

export interface Chapter {
  id: string;
  name: string;
  topic_id: string;
}

export interface Topic {
  id: string;
  name: string;
  exam_group_id: string;
  chapters?: Chapter[];
}

export interface ExamGroup {
  id: string;
  name: string;
  topics?: Topic[];
}

const fetchExamData = async (): Promise<ExamGroup[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('exam_groups')
    .select(`
      id,
      name,
      topics:topics (
        id,
        name,
        exam_group_id,
        chapters:chapters (
          id,
          name,
          topic_id
        )
      )
    `);

  if (error) {
    console.error("Supabase Error:", error.message);
    throw error;
  }

  console.log("Supabase Connected. Data:", data);
  return data as ExamGroup[];
};

export default function useExamData() {
  return useQuery<ExamGroup[]>({
    queryKey: ['examData'],
    queryFn: fetchExamData,
    staleTime: 1000 * 60 * 10, // 10 minutes - Only refetch after 10 minutes
    gcTime: 1000 * 60 * 30, 
    refetchOnWindowFocus: true,
    retry: 1,
  });
}
