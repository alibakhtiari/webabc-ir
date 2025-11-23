import { redirect } from 'next/navigation';

export default function RootPage() {
    // This page should normally be intercepted by middleware.
    // If it renders, it means middleware didn't redirect, so we force a redirect to default locale.
    redirect('/fa');
}
