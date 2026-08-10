import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModelReusable from 'src/components/ModelResuble';
import { useToast } from 'src/context/toast';
import { DashboardContent } from 'src/layouts/dashboard';
import { AppDispatch, RootState } from 'src/stores';
import {
  ChangeBlogVisibility,
  clearSelected,
  DeleteBlog,
  getAllBlogs,
} from 'src/stores/slices/blog';
import { BlogCard, BlogCardSkeleton } from './BlogForm';

export default function BlogSection() {
  const { data, loading } = useSelector((s: RootState) => s.blog);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    dispatch(getAllBlogs());
    return () => {
      dispatch(clearSelected());
    };
  }, [dispatch]);

  const handleDelete = () => {
    if (!selectedId) return;
    dispatch(DeleteBlog(selectedId)).then((res) => {
      if (res.payload?.success) {
        toast.showSuccess('Blog deleted successfully');
        setSelectedId('');
        setOpenDelete(false);
      } else {
        toast.showError('Failed to delete blog');
      }
    });
  };

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h4">Blog Section</Typography>
        <Button variant="contained" onClick={() => navigate('/blog-section/create')}>
          Add New Blog
        </Button>
      </Box>

      <Grid container spacing={2}>
        {loading ? (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        ) : data.length > 0 ? (
          data.map((item) => (
            <BlogCard
              key={item._id}
              data={item}
              onView={(id) => navigate(`/blog-section/${id}`)}
              onDelete={(id) => {
                setSelectedId(id);
                setOpenDelete(true);
              }}
              onToggleVisibility={(id) => {
                dispatch(ChangeBlogVisibility(id)).then((res) => {
                  if (res.payload?.success) {
                    toast.showSuccess('Visibility updated');
                  } else {
                    toast.showError('Failed to update visibility');
                  }
                });
              }}
            />
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary">
              No blog posts yet. Click &quot;Add New Blog&quot; to create your first post.
            </Typography>
          </Grid>
        )}
      </Grid>

      <ModelReusable
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        title=""
        top="50%"
        component={
          <>
            <Typography variant="h3" textAlign="center">
              ⚠️
            </Typography>
            <Typography variant="h5" textAlign="center">
              Delete this blog post?
            </Typography>
            <Typography textAlign="center" color="text.secondary">
              This action cannot be undone.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 3 }}>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenDelete(false);
                  setSelectedId('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      />
    </DashboardContent>
  );
}
