export const GRADE_ORDER = ['Nursery', '1', '2', '3', '4', '5', '6', 'Special'];

export function gradeRank(grade: string): number {
  const idx = GRADE_ORDER.indexOf(grade);
  return idx === -1 ? GRADE_ORDER.length : idx;
}

export function sortByGrade<T extends { grade: string; name: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const r = gradeRank(a.grade) - gradeRank(b.grade);
    if (r !== 0) return r;
    return a.name.localeCompare(b.name);
  });
}