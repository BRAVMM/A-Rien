
/**
 * Interface for AreaData
 * Interface to send area data to the front
 * @interface AreaData
 */
interface AreaDetailsInterface {
    id: number;
    title: string;
    serviceName: string;
    isActivated: boolean;
}

export { AreaDetailsInterface as AreaData }
