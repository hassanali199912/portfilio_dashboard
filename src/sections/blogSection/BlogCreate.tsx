import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BackBtn from 'src/components/BackBtn';
import { useToast } from 'src/context/toast';
import { DashboardContent } from 'src/layouts/dashboard';
import { BlogFormData } from 'src/schemas/blog.schema';
import { AppDispatch } from 'src/stores';
import { BlogItem, CreateBlog } from 'src/stores/slices/blog';
import { BlogForm, defaultBlogFormValues } from './BlogForm';

export default function BlogCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (values: BlogFormData) => {
    return dispatch(CreateBlog(values as Partial<BlogItem>)).then((res) => {
      if (res.payload?.success) {
        toast.showSuccess('Blog created successfully');
        navigate('/blog-section');
      } else {
        toast.showError('Failed to create blog. Make sure the backend /blog API is ready.');
      }
    });
  };

  return (
    <DashboardContent maxWidth="xl">
      <BackBtn link="/blog-section" />
      <BlogForm
        defaultValues={defaultBlogFormValues}
        submitLabel="Publish Blog"
        onSubmit={handleSubmit}
      />
    </DashboardContent>
  );
}
