export enum ReportType {
    FULL = "full",
    LIGHT = "light",
    NARROW = "narrow",
}

export enum EngineType {
    DIESEL = "diesel",
    ELECTRIC = "electric",
    HYBRID = "hybrid",
    HYBRID_DIESEL = "hybrid_diesel",
    HYBRID_GASOLINE = "hybrid_gasoline",
    PETROL = "petrol",
}

function isReportType(arg: string): arg is ReportType {
    return Object.values(ReportType).includes(arg as ReportType);
}

export const getReportType = (reportType: string): ReportType => {
    if (isReportType(reportType)) {
        return reportType;
    }
    return ReportType.FULL;
}

function isEngineType(arg: string): arg is EngineType {
    return Object.values(EngineType).includes(arg as EngineType);
}

export const getEngineType = (engineType: string): EngineType => {
    if (isEngineType(engineType)) {
        return engineType;
    }
    return EngineType.PETROL;
}