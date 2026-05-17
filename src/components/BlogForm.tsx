import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Image, Send } from 'lucide-react';

export default function BlogForm({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [authorName, setAuthorName] = useState('Aashiyan Team');
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .slice(0, 80);
  }

  async function handleSubmit(publish: boolean) {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setPublishing(true);
    setError('');

    const slug = generateSlug(title) + '-' + Date.now().toString(36);

    const { error: insertError } = await supabase.from('blogs').insert({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt.trim(),
      cover_image_url: coverImageUrl.trim(),
      author_name: authorName.trim() || 'Aashiyan Team',
      published: publish,
    });

    if (insertError) {
      setError(insertError.message);
      setPublishing(false);
      return;
    }

    onBack();
  }

  return (
    <section className="py-24 px-5 bg-[#FAFAF8] min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-amber-500 text-sm font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to blog
        </button>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 leading-snug mb-2">
          Write a new story
        </h1>
        <p className="text-slate-500 text-base mb-10">
          Share a moment, an update, or a story from Aashiyan.
        </p>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A day of firsts at Aashiyan..."
              className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-700 font-semibold outline-none transition-colors placeholder:text-slate-300"
            />
          </div>

          {/* Author */}
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">Author</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Aashiyan Team"
              className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-700 outline-none transition-colors placeholder:text-slate-300"
            />
          </div>

          {/* Cover image URL */}
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block flex items-center gap-2">
              <Image size={14} />
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder="https://images.pexels.com/..."
              className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-700 outline-none transition-colors placeholder:text-slate-300 text-sm font-mono"
            />
            {coverImageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">Short Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief preview that appears on the blog card..."
              rows={2}
              className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-700 outline-none transition-colors placeholder:text-slate-300 resize-none text-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-slate-700 text-sm font-bold mb-2 block">Content</label>
            <p className="text-slate-400 text-xs mb-2">
              Use blank lines for paragraphs. Start a line with ## or ### for headings.
            </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Today was a special day at Aashiyan..."
              rows={12}
              className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-700 outline-none transition-colors placeholder:text-slate-300 resize-y text-sm leading-relaxed"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-rose-50 text-rose-600 text-sm font-semibold px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleSubmit(true)}
              disabled={publishing}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-300 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg"
            >
              <Send size={16} />
              {publishing ? 'Publishing...' : 'Publish Now'}
            </button>
            <button
              onClick={() => handleSubmit(false)}
              disabled={publishing}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-600 font-bold py-4 rounded-2xl transition-colors"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
