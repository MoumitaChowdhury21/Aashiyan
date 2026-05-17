import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calendar, User, ArrowRight, PenLine, BookOpen } from 'lucide-react';
import BlogDetail from './BlogDetail';
import BlogForm from './BlogForm';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image_url: string;
  author_name: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

type View = 'list' | 'detail' | 'create';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>('list');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function fetchBlogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
    setLoading(false);
  }

  function openDetail(blog: BlogPost) {
    setSelectedBlog(blog);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openCreate() {
    setView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setView('list');
    setSelectedBlog(null);
    fetchBlogs();
  }

  if (view === 'detail' && selectedBlog) {
    return <BlogDetail blog={selectedBlog} onBack={goBack} />;
  }

  if (view === 'create') {
    return <BlogForm onBack={goBack} />;
  }

  return (
    <section id="blog" className="py-24 px-5 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-sky-50 text-sky-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Daily Blog
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-4">
            Stories from the nest
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed">
            Everyday moments, small victories, and the warmth of our community — told one day at a time.
          </p>
        </div>

        {/* Create button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold text-sm px-6 py-3 rounded-full transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <PenLine size={16} />
            Write a Blog
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-3 border-amber-300 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <BookOpen size={28} className="text-sky-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-700 mb-2">No stories yet</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              Be the first to share a moment from Aashiyan. Every story matters.
            </p>
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-bold text-sm px-6 py-3 rounded-full transition-all hover:shadow-md"
            >
              <PenLine size={16} />
              Write the First Blog
            </button>
          </div>
        )}

        {/* Blog grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} onClick={() => openDetail(blog)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BlogCard({
  blog,
  index,
  onClick,
}: {
  blog: BlogPost;
  index: number;
  onClick: () => void;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  const date = new Date(blog.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onClick}
      className={`group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Cover image */}
      {blog.cover_image_url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center">
          <BookOpen size={36} className="text-sky-300" />
        </div>
      )}

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {blog.author_name}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-slate-800 text-lg leading-snug mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {blog.excerpt}
          </p>
        )}

        {/* Read more */}
        <span className="inline-flex items-center gap-1 text-amber-500 text-sm font-semibold group-hover:gap-2 transition-all">
          Read more
          <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
