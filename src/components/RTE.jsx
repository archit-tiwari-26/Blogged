import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';

export default function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div className='w-full'> 
      {label && (
        <label className='inline-block mb-3 text-sm font-medium text-gray-300 transition-colors duration-200'>
          {label}
        </label>
      )}

      <div className="relative group">
        <Controller
          name={name || "content"}
          control={control}
          render={({field: {onChange}}) => (
            <div className="rounded-lg overflow-hidden border border-gray-700/50 
                          hover:border-gray-600/50 transition-all duration-300
                          bg-gray-900/50 backdrop-blur-sm">
              <Editor
                apiKey='id59use43jnvcezlnd8alniza2l031djzwq83os73adqk92r'
                initialValue={defaultValue}
                init={{
                  initialValue: defaultValue,
                  height: 400,
                  menubar: true,
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                  ],
                  toolbar: `
                    undo redo | blocks fontfamily fontsize | 
                    bold italic underline strikethrough | 
                    forecolor backcolor | 
                    alignleft aligncenter alignright alignjustify | 
                    bullist numlist outdent indent | 
                    link image media table | 
                    code preview fullscreen | 
                    removeformat help
                  `,
                  toolbar_mode: 'sliding',
                  contextmenu: 'link image table',
                  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
                  quickbars_insert_toolbar: 'quickimage quicktable',
                  content_style: `
                    body { 
                      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                      font-size: 14px;
                      line-height: 1.6;
                      color: #e5e7eb;
                      background-color: #111827;
                      margin: 1rem;
                    }
                    h1, h2, h3, h4, h5, h6 {
                      color: #f9fafb;
                      margin-top: 1.5rem;
                      margin-bottom: 0.5rem;
                    }
                    p {
                      margin-bottom: 1rem;
                    }
                    a {
                      color: #60a5fa;
                      text-decoration: none;
                    }
                    a:hover {
                      color: #93c5fd;
                      text-decoration: underline;
                    }
                    blockquote {
                      border-left: 4px solid #3b82f6;
                      margin: 1.5rem 0;
                      padding-left: 1rem;
                      color: #d1d5db;
                      font-style: italic;
                    }
                    code {
                      background-color: #374151;
                      color: #f3f4f6;
                      padding: 0.125rem 0.25rem;
                      border-radius: 0.25rem;
                      font-size: 0.875rem;
                    }
                    pre {
                      background-color: #1f2937;
                      border: 1px solid #374151;
                      border-radius: 0.5rem;
                      padding: 1rem;
                      overflow-x: auto;
                    }
                    table {
                      border-collapse: collapse;
                      width: 100%;
                      margin: 1rem 0;
                    }
                    table td, table th {
                      border: 1px solid #4b5563;
                      padding: 0.5rem;
                    }
                    table th {
                      background-color: #374151;
                      color: #f9fafb;
                      font-weight: 600;
                    }
                    ul, ol {
                      margin: 1rem 0;
                      padding-left: 2rem;
                    }
                    img {
                      max-width: 100%;
                      height: auto;
                      border-radius: 0.5rem;
                      margin: 1rem 0;
                    }
                  `,
                  branding: false,
                  promotion: false,
                  resize: false,
                  statusbar: false,
                  browser_spellcheck: true,
                  contextmenu_never_use_native: true,
                  paste_data_images: true,
                  automatic_uploads: true,
                  file_picker_types: 'image',
                  powerpaste_word_import: 'clean',
                  powerpaste_html_import: 'clean',
                }}
                onEditorChange={onChange}
              />
            </div>
          )}
        />
        
        {/* Subtle glow effect on focus */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-focus-within:opacity-100 
                      transition-opacity duration-300 pointer-events-none
                      bg-gradient-to-r from-blue-500/5 to-purple-500/5 -z-10" />
      </div>

      {/* Editor tips */}
      <div className="mt-3 text-xs text-gray-500">
        <p className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Use the toolbar above to format your content. You can add images, links, and more.
        </p>
      </div>
    </div>
  )
}