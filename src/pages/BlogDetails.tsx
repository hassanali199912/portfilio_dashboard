import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import BlogView from 'src/sections/blogSection/BlogView';
import { AppDispatch, RootState } from 'src/stores';
import { clearSelected, getBlogById, getBlogByIdApi } from 'src/stores/slices/blog';

export default function Page() {
  const { id } = useParams();
  const { selected, data } = useSelector((s: RootState) => s.blog);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    if (data.length === 0) {
      dispatch(getBlogByIdApi(id));
      return;
    }

    dispatch(getBlogById(id));
    return () => {
      dispatch(clearSelected());
    };
  }, [dispatch, id, data.length]);

  return (
    <>
      <title>{`Edit Blog - ${CONFIG.appName}`}</title>
      {selected && <BlogView data={selected} />}
    </>
  );
}
