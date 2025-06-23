import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface Session {
  name: string;
  datetime: string;
}

interface NextSessionsListProps {
  sessions: Session[];
}

export default function NextSessionsList({ sessions }: NextSessionsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Próximas Sessões
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sessions.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhuma sessão agendada</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.name}</p>
                  <p className="text-sm text-gray-500">{session.datetime}</p>
                </div>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}