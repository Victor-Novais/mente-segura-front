import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
    title: string;
    value: string | number;
    legend: string;
    icon: LucideIcon;
    iconBg?: string;
}

export default function StatusCard({
    title,
    value,
    legend,
    icon: Icon,
    iconBg = "bg-purple-100"
}: StatusCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">{title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                        <p className="text-xs text-gray-500 mt-1">{legend}</p>
                    </div>
                    <div className={`p-3 rounded-full ${iconBg}`}>
                        <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
