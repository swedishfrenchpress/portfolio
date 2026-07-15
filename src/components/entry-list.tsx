type Entry = {
  title: string;
  href: string;
  meta: string;
};

export function EntryList({ entries }: { entries: readonly Entry[] }) {
  return (
    <ul className="space-y-5">
      {entries.map((item) => (
        <li key={item.title}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            {item.title}
          </a>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.meta}
          </p>
        </li>
      ))}
    </ul>
  );
}
