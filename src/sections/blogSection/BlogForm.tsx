import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControlLabel,
  Grid,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import RichTextEditor from 'src/components/RichTextEditor';
import { BlogFormData, blogFormSchema } from 'src/schemas/blog.schema';

export const defaultBlogFormValues: BlogFormData = {
  title: { ar: '', en: '' },
  excerpt: { ar: '', en: '' },
  content: { ar: '', en: '' },
  tags: [],
  readingTime: 5,
  coverImage: '',
  slug: '',
  isFeatured: false,
  isVisible: true,
  order: 0,
};

interface BlogFormProps {
  defaultValues: BlogFormData;
  submitLabel: string;
  onSubmit: (values: BlogFormData) => void | Promise<void>;
}

export function BlogForm({ defaultValues, submitLabel, onSubmit }: BlogFormProps) {
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (values: BlogFormData) => {
    setDisabled(true);
    try {
      await onSubmit(values);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={form.handleSubmit(handleSubmit, () => {
          // validation errors handled by form fields
        })}
      >
        <Button
          disabled={disabled}
          type="submit"
          variant="contained"
          sx={{ display: 'block', mb: 3, ml: 'auto' }}
        >
          {submitLabel}
        </Button>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <FlagsSection disabled={disabled} />
            <TitleSection disabled={disabled} />
            <MetaSection disabled={disabled} />
            <ExcerptSection disabled={disabled} />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <ContentSection disabled={disabled} />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}

function FlagsSection({ disabled }: { disabled: boolean }) {
  const { control } = useFormContext<BlogFormData>();

  return (
    <Card sx={{ mb: 3, p: 3 }}>
      <FormControlLabel
        control={
          <Controller
            disabled={disabled}
            name="isFeatured"
            control={control}
            render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
          />
        }
        label="Featured Post"
      />
      <FormControlLabel
        control={
          <Controller
            disabled={disabled}
            name="isVisible"
            control={control}
            render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
          />
        }
        label="Visible on Portfolio"
      />
    </Card>
  );
}

function TitleSection({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<BlogFormData>();

  const titleEn = watch('title.en');
  const slug = watch('slug');

  const handleTitleEnBlur = () => {
    if (!slug && titleEn) {
      const generated = titleEn
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setValue('slug', generated);
    }
  };

  const titleErrors = errors.title as { ar?: { message?: string }; en?: { message?: string } };

  return (
    <Card sx={{ mb: 3, p: 3 }}>
      <Typography variant="h6" mb={2}>
        Title
      </Typography>
      <Controller
        disabled={disabled}
        name="title.en"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onBlur={() => {
              field.onBlur();
              handleTitleEnBlur();
            }}
            label="English Title"
            fullWidth
            sx={{ mb: 2 }}
            error={!!titleErrors?.en}
            helperText={titleErrors?.en?.message}
          />
        )}
      />
      <Controller
        disabled={disabled}
        name="title.ar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Arabic Title"
            fullWidth
            error={!!titleErrors?.ar}
            helperText={titleErrors?.ar?.message}
          />
        )}
      />
    </Card>
  );
}

function MetaSection({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<BlogFormData>();

  return (
    <Card sx={{ mb: 3, p: 3 }}>
      <Typography variant="h6" mb={2}>
        Metadata
      </Typography>

      <Controller
        disabled={disabled}
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            freeSolo
            options={['React', 'TypeScript', 'Node.js', 'Career', 'Tutorial', 'DevOps']}
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Add tags..."
                error={!!errors.tags}
                helperText={errors.tags?.message as string}
                sx={{ mb: 2 }}
              />
            )}
          />
        )}
      />

      <Controller
        disabled={disabled}
        name="readingTime"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
            type="number"
            label="Reading Time (minutes)"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.readingTime}
            helperText={errors.readingTime?.message}
          />
        )}
      />

      <Controller
        disabled={disabled}
        name="slug"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="URL Slug"
            placeholder="my-blog-post-title"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.slug}
            helperText={errors.slug?.message || 'Used in the blog URL on your portfolio'}
          />
        )}
      />

      <Controller
        disabled={disabled}
        name="coverImage"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Cover Image URL"
            fullWidth
            sx={{ mb: 2 }}
            error={!!errors.coverImage}
            helperText={errors.coverImage?.message}
          />
        )}
      />

      <Controller
        disabled={disabled}
        name="order"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onChange={(e) => field.onChange(Number(e.target.value))}
            type="number"
            label="Display Order"
            fullWidth
          />
        )}
      />
    </Card>
  );
}

function ExcerptSection({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<BlogFormData>();

  const excerptErrors = errors.excerpt as { ar?: { message?: string }; en?: { message?: string } };

  return (
    <Card sx={{ mb: 3, p: 3 }}>
      <Typography variant="h6" mb={2}>
        Excerpt (Card Preview)
      </Typography>
      <Controller
        disabled={disabled}
        name="excerpt.en"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="English Excerpt"
            fullWidth
            multiline
            minRows={3}
            sx={{ mb: 2 }}
            error={!!excerptErrors?.en}
            helperText={excerptErrors?.en?.message}
          />
        )}
      />
      <Controller
        disabled={disabled}
        name="excerpt.ar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Arabic Excerpt"
            fullWidth
            multiline
            minRows={3}
            error={!!excerptErrors?.ar}
            helperText={excerptErrors?.ar?.message}
          />
        )}
      />
    </Card>
  );
}

function ContentSection({ disabled }: { disabled: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<BlogFormData>();

  const contentErrors = errors.content as { ar?: { message?: string }; en?: { message?: string } };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Content
      </Typography>
      <Controller
        disabled={disabled}
        name="content.en"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            label="English Content"
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
            error={!!contentErrors?.en}
            helperText={contentErrors?.en?.message}
            minHeight={280}
          />
        )}
      />
      <Controller
        disabled={disabled}
        name="content.ar"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            label="Arabic Content"
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
            error={!!contentErrors?.ar}
            helperText={contentErrors?.ar?.message}
            minHeight={280}
          />
        )}
      />
    </Card>
  );
}

export function BlogCardSkeleton() {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <Skeleton sx={{ height: 180 }} animation="wave" variant="rectangular" />
        <CardContent>
          <Skeleton animation="wave" height={20} width="60%" />
          <Skeleton animation="wave" height={14} width="90%" sx={{ mt: 1 }} />
          <Skeleton animation="wave" height={14} width="70%" sx={{ mt: 0.5 }} />
        </CardContent>
      </Card>
    </Grid>
  );
}

interface BlogCardProps {
  data: {
    _id: string;
    title: { en: string; ar: string };
    excerpt: { en: string; ar: string };
    tags: string[];
    readingTime: number;
    coverImage?: string;
    isFeatured: boolean;
    isVisible: boolean;
    slug: string;
    createdAt: string;
  };
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export function BlogCard({ data, onView, onDelete, onToggleVisibility }: BlogCardProps) {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: 3,
          transition: '0.3s',
          '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={data.coverImage || 'assets/images/product/product-2.webp'}
            alt={data.title.en}
          />
          {data.isFeatured && (
            <Chip
              label="Featured"
              color="primary"
              size="small"
              sx={{ position: 'absolute', top: 12, left: 12, fontWeight: 600 }}
            />
          )}
          {!data.isVisible && (
            <Chip
              label="Hidden"
              color="warning"
              size="small"
              sx={{ position: 'absolute', top: 12, right: 12 }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip label={`${data.readingTime} min read`} size="small" variant="outlined" />
            <Typography variant="caption" color="text.secondary">
              /{data.slug}
            </Typography>
          </Stack>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            {data.title.en}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {data.excerpt.en}
          </Typography>

          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {data.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Stack>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Button size="small" variant="contained" onClick={() => onView(data._id)}>
            Edit
          </Button>
          <Button size="small" variant="outlined" onClick={() => onToggleVisibility(data._id)}>
            Toggle Visibility
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(data._id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
