import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricResponseDto, MetricListItemDto } from './dto/metric-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class MetricsController {
    private service;
    constructor(service: MetricsService);
    findAll(classId?: string): Promise<MetricListItemDto[]>;
    create(dto: CreateMetricDto): Promise<MetricResponseDto>;
    remove(id: string): Promise<SuccessResponseDto>;
}
