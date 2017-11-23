export class AnalyticsEvent{
    eventCategory: string;
    eventAction: string;
    eventLabel: string;
    eventValue: number;

    constructor(category: string, action: string, label = null, value = 0){
        this.eventCategory = category;
        this.eventAction = action;
        this.eventLabel = label;
        this.eventValue = value;
    }
}