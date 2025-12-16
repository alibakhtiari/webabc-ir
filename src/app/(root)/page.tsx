import { redirect } from 'next/navigation';

export default function RootPage() {
    // This generates a static HTML file with a meta-refresh tag.
    // It effectively contains 0kb of client-side JavaScript.
    redirect('/fa');
}