import * as moment from 'moment';

export class Photo{
    private _email: string;
    private _lat: number;
    private _lng: number;
    private _location: string;
    private _fileName: string;
    private _base64: string;
    private _date: moment.Moment;

    constructor(){

    }

	public get email(): string {
		return this._email;
	}

	public set email(value: string) {
        this._email = value;
	}

	public get lat(): number {
		return this._lat;
	}

	public set lat(value: number) {
		this._lat = value;
	}

	public get lng(): number {
		return this._lng;
	}

	public set lng(value: number) {
		this._lng = value;
	}

	public get location(): string {
		return this._location;
	}

	public set location(value: string) {
		this._location = value;
	}

	public get fileName(): string {
		return this._fileName;
	}

	public set fileName(value: string) {
		this._fileName = value;
	}

	public get base64(): string {
		return this._base64;
	}

	public set base64(value: string) {
		this._base64 = value;
    }
    

	public get date(): moment.Moment {
		return this._date;
	}

	public set date(value: moment.Moment) {
		this._date = value;
	}
    

    
}