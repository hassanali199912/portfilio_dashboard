import { useDispatch } from 'react-redux';
import BackBtn from 'src/components/BackBtn';
import { useToast } from 'src/context/toast';
import { DashboardContent } from 'src/layouts/dashboard';
import { BlogFormData } from 'src/schemas/blog.schema';
import { AppDispatch } from 'src/stores';
import { BlogItem, UpdateBlog } from 'src/stores/slices/blog';
import { BlogForm } from './BlogForm';

interface Props {
  data: BlogItem;
}

export default function BlogView({ data }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const handleSubmit = (values: BlogFormData) => {
    return dispatch(UpdateBlog({ id: data._id, data: values as Partial<BlogItem> })).then((res) => {
      if (res.payload?.success) {
        toast.showSuccess('Blog updated successfully');
      } else {
        toast.showError('Failed to update blog');
      }
    });
  };

  return (
    <DashboardContent maxWidth="xl">
      <BackBtn link="/blog-section" />
      <BlogForm defaultValues={data as BlogFormData} submitLabel="Update Blog" onSubmit={handleSubmit} />
    </DashboardContent>
  );
}
