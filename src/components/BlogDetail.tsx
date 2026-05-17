import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import type { BlogPost } from './Blog';

export default function BlogDetail({
  blog,
  onBack,
}: {
  blog: BlogPost;
  onBack: () => void;
}) {
  const date = new Date(blog.created_at).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="py-24 px-5 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-500 text-sm font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to all stories
        </button>

        {/* Cover image */}
        {blog.cover_image_url ? (
          <div className="rounded-3xl overflow-hidden shadow-lg mb-8">
            <img
              src={blog.cover_image_url}
              alt={blog.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
        ) : (
          <div className="rounded-3xl h-48 bg-gradient-to-br from-sky-100 to-amber-50 flex items-center justify-center mb-8">
            <BookOpen size={48} className="text-sky-300" />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={14} />
            {blog.author_name}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-6">
          {blog.title}
        </h1>

        {/* Excerpt highlight */}
        {blog.excerpt && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl px-6 py-4 mb-8">
            <p className="text-amber-800 text-base italic leading-relaxed font-medium">
              {blog.excerpt}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="prose-custom text-slate-700 text-base leading-relaxed space-y-5">
          {blog.content.split('\n').map((paragraph, i) => {
            if (!paragraph.trim()) return null;

            // Check for heading-like lines (start with #)
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={i} className="font-display text-xl font-bold text-slate-800 mt-8 mb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={i} className="font-display text-2xl font-bold text-slate-800 mt-10 mb-3">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }

            return (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Divider + back */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-amber-500 hover:text-amber-600 font-bold text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Read more stories
          </button>
        </div>
      </div>
    </section>
  );
}
