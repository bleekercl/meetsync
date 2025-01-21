import { formatTimeSlot } from '@/lib/utils/date';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Meeting } from '@/lib/types/meeting';

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const { toast } = useToast();

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/${meeting.hostId}/${meeting.id}`
    );
    toast({
      title: "Link copied",
      description: "Share this link with your attendees"
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold">{meeting.title}</h3>
      <div className="mt-4 space-y-2">
        {meeting.timeSlots.map((slot) => (
          <div key={slot.id} className="text-sm text-gray-600">
            {formatTimeSlot(slot.start, slot.end)}
            <span className="ml-2 text-xs">
              ({Object.values(meeting.responses).filter(
                (r) => r.availability[slot.id]
              ).length} available)
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={copyLink}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copy Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          asChild
        >
          <a href={`/${meeting.hostId}/${meeting.id}`}>
            <Users className="h-4 w-4" />
            View Responses
          </a>
        </Button>
      </div>
    </Card>
  );
} 