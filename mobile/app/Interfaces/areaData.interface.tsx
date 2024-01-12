
/**
 * @interface AreaDetailsInterface
 * @description Interface for AreaDetailsInterface.
 * @property {number} id - Id of the AreaDetailsInterface.
 * @property {string} title - Name of the AreaDetailsInterface.
 * @property {string} serviceName - Name of the service of the AreaDetailsInterface.
 * @property {boolean} isActivated - Status of the AreaDetailsInterface.
 */
interface AreaDetailsInterface {
    id: number;
    title: string;
    serviceName: string;
    isActivated: boolean;
}

export type { AreaDetailsInterface };
