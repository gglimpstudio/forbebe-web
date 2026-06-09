import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RegionFilter } from "@/components/ui/RegionFilter";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Branch } from "@/types";

export function BranchSection({ branches }: { branches: Branch[] }) {
  return (
    <section className="bg-background-light py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader title="가까운 포베베 지점을 확인하세요." description="지역을 선택하고 가까운 지점의 상담 채널로 바로 연결할 수 있습니다." />
          <Button href="/branches" variant="outline">지점 전체 보기</Button>
        </div>
        <RegionFilter branches={branches.slice(0, 6)} />
      </Container>
    </section>
  );
}
