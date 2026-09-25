"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRADE_ORDER = void 0;
exports.gradeRank = gradeRank;
exports.sortByGrade = sortByGrade;
exports.GRADE_ORDER = ['Nursery', '1', '2', '3', '4', '5', '6', 'Special'];
function gradeRank(grade) {
    const idx = exports.GRADE_ORDER.indexOf(grade);
    return idx === -1 ? exports.GRADE_ORDER.length : idx;
}
function sortByGrade(items) {
    return [...items].sort((a, b) => {
        const r = gradeRank(a.grade) - gradeRank(b.grade);
        if (r !== 0)
            return r;
        return a.name.localeCompare(b.name);
    });
}
//# sourceMappingURL=grade-order.js.map