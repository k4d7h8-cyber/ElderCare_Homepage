import { AdminInquiryDetailScreen } from "@/components/admin/AdminInquiryScreens";

type AdminInquiryDetailPageProps = {
  params: {
    id: string;
  };
};

export default function AdminInquiryDetailPage({ params }: AdminInquiryDetailPageProps) {
  return <AdminInquiryDetailScreen id={params.id} />;
}
