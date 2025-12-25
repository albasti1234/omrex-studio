import { redirect } from 'next/navigation';

// Redirect /demos/green-valley to /demos/green-valley/ar (Arabic default)
export default function GreenValleyRedirect() {
    redirect('/demos/green-valley/ar');
}
