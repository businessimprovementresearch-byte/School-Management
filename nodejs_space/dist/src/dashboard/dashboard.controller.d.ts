import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import type { Request } from 'express';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(req: Request): Promise<DashboardResponseDto>;
}
