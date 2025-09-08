import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
  title: (
    <div className="flex items-center gap-2">
      <img
        src="/docs.jpg"   // 静态资源路径
        alt="Logo"
        className="h-6 w-6 rounded"
      />
      <span className="font-semibold text-lg">Docs</span>
    </div>
  ),
},
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  };
}
