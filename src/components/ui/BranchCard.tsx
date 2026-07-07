import { Clock, Map, MapPin, Navigation, Phone } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Branch } from "@/types";

export function BranchCard({ branch }: { branch: Branch }) {
  const bookingUrl = branch.naverBookingUrl || branch.bookingUrl;

  return (
    <Card className="h-full">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <Badge>{branch.region}</Badge>
          <h3 className="mt-3 text-xl font-medium text-brand-primary">{branch.name}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-background-soft text-brand-primary">
          <MapPin className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <p className="text-sm font-semibold text-text-sub">{branch.serviceArea}</p>
      <p className="mt-2 text-sm leading-6 text-text-sub">{branch.address}</p>
      {branch.operatingHours ? (
        <p className="mt-2 flex items-center gap-2 text-sm leading-6 text-text-sub">
          <Clock className="h-4 w-4 text-brand-primary" aria-hidden />
          {branch.operatingHours}
        </p>
      ) : null}
      {branch.description ? <p className="cms-lines mt-3 text-sm leading-6 text-text-sub">{branch.description}</p> : null}
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {branch.naverMapUrl ? (
          <Button href={branch.naverMapUrl} variant="outline" size="sm" className="gap-2">
            <Map className="h-4 w-4" /> 네이버지도
          </Button>
        ) : null}
        {branch.kakaoMapUrl ? (
          <Button href={branch.kakaoMapUrl} variant="outline" size="sm" className="gap-2">
            <Navigation className="h-4 w-4" /> 카카오맵
          </Button>
        ) : null}
        {branch.phone ? (
          <Button href={`tel:${branch.phone}`} variant="outline" size="sm" className="gap-2">
            <Phone className="h-4 w-4" /> 전화하기
          </Button>
        ) : null}
        {branch.kakaoUrl ? (
          <Button href={branch.kakaoUrl} variant="secondary" size="sm" className="gap-2">
            <Navigation className="h-4 w-4" /> 상담
          </Button>
        ) : null}
        {bookingUrl ? (
          <Button href={bookingUrl} size="sm">
            네이버예약
          </Button>
        ) : null}
        {branch.blogUrl ? (
          <Button href={branch.blogUrl} variant="ghost" size="sm">
            블로그
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
