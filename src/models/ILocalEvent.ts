export interface ILocalEvent {
    eventId: number;
    name: string;
    priority: number;
    details: string;
    startTime: string;
    endTime: string;
    eventCategoryId: number;
    locationId: number;
    organiserId: number;
    assocatiatedLocation: { county: string, lat: number, lng: number, locationID: number, name: string, town: string };
    associatedOrganiser: {};
    associatedEventGroup: {}

}