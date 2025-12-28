import type { Metadata } from 'next';
import './classfood.css';

export const metadata: Metadata = {
    title: 'Classfood Restaurant | مطعم كلاس فود',
    description: 'Order delicious food online from Classfood Restaurant - Indian, Arabic & Fast Casual',
};

export default function ClassfoodLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
