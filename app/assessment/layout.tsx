import { AssessmentProvider } from '@/lib/assessment/context';

export default function AssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AssessmentProvider>{children}</AssessmentProvider>;
}
