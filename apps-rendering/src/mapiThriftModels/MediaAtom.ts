/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @creditkarma/thrift-typescript v3.7.6
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "@creditkarma/thrift-server-core";
import * as Asset from "./Asset";
import * as Category from "./Category";
import * as Metadata from "./Metadata";
import * as Image from "./Image";
export interface IMediaAtom {
    assets: Array<Asset.IAsset>;
    activeVersion?: thrift.Int64;
    title: string;
    category: Category.Category;
    plutoProjectId?: string;
    duration?: thrift.Int64;
    source?: string;
    posterUrl?: string;
    description?: string;
    metadata?: Metadata.IMetadata;
    posterImage?: Image.IImage;
    trailText?: string;
    byline?: Array<string>;
    commissioningDesks?: Array<string>;
    keywords?: Array<string>;
    trailImage?: Image.IImage;
    optimisedForWeb?: boolean;
    commentsEnabled?: boolean;
    suppressRelatedContent?: boolean;
}
export interface IMediaAtomArgs {
    assets: Array<Asset.IAssetArgs>;
    activeVersion?: number | string | thrift.Int64;
    title: string;
    category: Category.Category;
    plutoProjectId?: string;
    duration?: number | string | thrift.Int64;
    source?: string;
    posterUrl?: string;
    description?: string;
    metadata?: Metadata.IMetadataArgs;
    posterImage?: Image.IImageArgs;
    trailText?: string;
    byline?: Array<string>;
    commissioningDesks?: Array<string>;
    keywords?: Array<string>;
    trailImage?: Image.IImageArgs;
    optimisedForWeb?: boolean;
    commentsEnabled?: boolean;
    suppressRelatedContent?: boolean;
}
export const MediaAtomCodec: thrift.IStructCodec<IMediaAtomArgs, IMediaAtom> = {
    encode(args: IMediaAtomArgs, output: thrift.TProtocol): void {
        const obj: any = {
            assets: args.assets,
            activeVersion: (typeof args.activeVersion === "number" ? new thrift.Int64(args.activeVersion) : typeof args.activeVersion === "string" ? thrift.Int64.fromDecimalString(args.activeVersion) : args.activeVersion),
            title: args.title,
            category: args.category,
            plutoProjectId: args.plutoProjectId,
            duration: (typeof args.duration === "number" ? new thrift.Int64(args.duration) : typeof args.duration === "string" ? thrift.Int64.fromDecimalString(args.duration) : args.duration),
            source: args.source,
            posterUrl: args.posterUrl,
            description: args.description,
            metadata: args.metadata,
            posterImage: args.posterImage,
            trailText: args.trailText,
            byline: args.byline,
            commissioningDesks: args.commissioningDesks,
            keywords: args.keywords,
            trailImage: args.trailImage,
            optimisedForWeb: args.optimisedForWeb,
            commentsEnabled: args.commentsEnabled,
            suppressRelatedContent: args.suppressRelatedContent
        };
        output.writeStructBegin("MediaAtom");
        if (obj.assets != null) {
            output.writeFieldBegin("assets", thrift.TType.LIST, 2);
            output.writeListBegin(thrift.TType.STRUCT, obj.assets.length);
            obj.assets.forEach((value_1: Asset.IAssetArgs): void => {
                Asset.AssetCodec.encode(value_1, output);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[assets] is unset!");
        }
        if (obj.activeVersion != null) {
            output.writeFieldBegin("activeVersion", thrift.TType.I64, 3);
            output.writeI64((typeof obj.activeVersion === "number" ? new thrift.Int64(obj.activeVersion) : typeof obj.activeVersion === "string" ? thrift.Int64.fromDecimalString(obj.activeVersion) : obj.activeVersion));
            output.writeFieldEnd();
        }
        if (obj.title != null) {
            output.writeFieldBegin("title", thrift.TType.STRING, 4);
            output.writeString(obj.title);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[title] is unset!");
        }
        if (obj.category != null) {
            output.writeFieldBegin("category", thrift.TType.I32, 5);
            output.writeI32(obj.category);
            output.writeFieldEnd();
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[category] is unset!");
        }
        if (obj.plutoProjectId != null) {
            output.writeFieldBegin("plutoProjectId", thrift.TType.STRING, 6);
            output.writeString(obj.plutoProjectId);
            output.writeFieldEnd();
        }
        if (obj.duration != null) {
            output.writeFieldBegin("duration", thrift.TType.I64, 7);
            output.writeI64((typeof obj.duration === "number" ? new thrift.Int64(obj.duration) : typeof obj.duration === "string" ? thrift.Int64.fromDecimalString(obj.duration) : obj.duration));
            output.writeFieldEnd();
        }
        if (obj.source != null) {
            output.writeFieldBegin("source", thrift.TType.STRING, 8);
            output.writeString(obj.source);
            output.writeFieldEnd();
        }
        if (obj.posterUrl != null) {
            output.writeFieldBegin("posterUrl", thrift.TType.STRING, 9);
            output.writeString(obj.posterUrl);
            output.writeFieldEnd();
        }
        if (obj.description != null) {
            output.writeFieldBegin("description", thrift.TType.STRING, 10);
            output.writeString(obj.description);
            output.writeFieldEnd();
        }
        if (obj.metadata != null) {
            output.writeFieldBegin("metadata", thrift.TType.STRUCT, 11);
            Metadata.MetadataCodec.encode(obj.metadata, output);
            output.writeFieldEnd();
        }
        if (obj.posterImage != null) {
            output.writeFieldBegin("posterImage", thrift.TType.STRUCT, 12);
            Image.ImageCodec.encode(obj.posterImage, output);
            output.writeFieldEnd();
        }
        if (obj.trailText != null) {
            output.writeFieldBegin("trailText", thrift.TType.STRING, 14);
            output.writeString(obj.trailText);
            output.writeFieldEnd();
        }
        if (obj.byline != null) {
            output.writeFieldBegin("byline", thrift.TType.LIST, 15);
            output.writeListBegin(thrift.TType.STRING, obj.byline.length);
            obj.byline.forEach((value_2: string): void => {
                output.writeString(value_2);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (obj.commissioningDesks != null) {
            output.writeFieldBegin("commissioningDesks", thrift.TType.LIST, 16);
            output.writeListBegin(thrift.TType.STRING, obj.commissioningDesks.length);
            obj.commissioningDesks.forEach((value_3: string): void => {
                output.writeString(value_3);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (obj.keywords != null) {
            output.writeFieldBegin("keywords", thrift.TType.LIST, 17);
            output.writeListBegin(thrift.TType.STRING, obj.keywords.length);
            obj.keywords.forEach((value_4: string): void => {
                output.writeString(value_4);
            });
            output.writeListEnd();
            output.writeFieldEnd();
        }
        if (obj.trailImage != null) {
            output.writeFieldBegin("trailImage", thrift.TType.STRUCT, 18);
            Image.ImageCodec.encode(obj.trailImage, output);
            output.writeFieldEnd();
        }
        if (obj.optimisedForWeb != null) {
            output.writeFieldBegin("optimisedForWeb", thrift.TType.BOOL, 19);
            output.writeBool(obj.optimisedForWeb);
            output.writeFieldEnd();
        }
        if (obj.commentsEnabled != null) {
            output.writeFieldBegin("commentsEnabled", thrift.TType.BOOL, 20);
            output.writeBool(obj.commentsEnabled);
            output.writeFieldEnd();
        }
        if (obj.suppressRelatedContent != null) {
            output.writeFieldBegin("suppressRelatedContent", thrift.TType.BOOL, 21);
            output.writeBool(obj.suppressRelatedContent);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IMediaAtom {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 2:
                    if (fieldType === thrift.TType.LIST) {
                        const value_5: Array<Asset.IAsset> = new Array<Asset.IAsset>();
                        const metadata_1: thrift.IThriftList = input.readListBegin();
                        const size_1: number = metadata_1.size;
                        for (let i_1: number = 0; i_1 < size_1; i_1++) {
                            const value_6: Asset.IAsset = Asset.AssetCodec.decode(input);
                            value_5.push(value_6);
                        }
                        input.readListEnd();
                        _args.assets = value_5;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 3:
                    if (fieldType === thrift.TType.I64) {
                        const value_7: thrift.Int64 = input.readI64();
                        _args.activeVersion = value_7;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 4:
                    if (fieldType === thrift.TType.STRING) {
                        const value_8: string = input.readString();
                        _args.title = value_8;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 5:
                    if (fieldType === thrift.TType.I32) {
                        const value_9: Category.Category = input.readI32();
                        _args.category = value_9;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 6:
                    if (fieldType === thrift.TType.STRING) {
                        const value_10: string = input.readString();
                        _args.plutoProjectId = value_10;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 7:
                    if (fieldType === thrift.TType.I64) {
                        const value_11: thrift.Int64 = input.readI64();
                        _args.duration = value_11;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 8:
                    if (fieldType === thrift.TType.STRING) {
                        const value_12: string = input.readString();
                        _args.source = value_12;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 9:
                    if (fieldType === thrift.TType.STRING) {
                        const value_13: string = input.readString();
                        _args.posterUrl = value_13;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 10:
                    if (fieldType === thrift.TType.STRING) {
                        const value_14: string = input.readString();
                        _args.description = value_14;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 11:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_15: Metadata.IMetadata = Metadata.MetadataCodec.decode(input);
                        _args.metadata = value_15;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 12:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_16: Image.IImage = Image.ImageCodec.decode(input);
                        _args.posterImage = value_16;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 14:
                    if (fieldType === thrift.TType.STRING) {
                        const value_17: string = input.readString();
                        _args.trailText = value_17;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 15:
                    if (fieldType === thrift.TType.LIST) {
                        const value_18: Array<string> = new Array<string>();
                        const metadata_2: thrift.IThriftList = input.readListBegin();
                        const size_2: number = metadata_2.size;
                        for (let i_2: number = 0; i_2 < size_2; i_2++) {
                            const value_19: string = input.readString();
                            value_18.push(value_19);
                        }
                        input.readListEnd();
                        _args.byline = value_18;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 16:
                    if (fieldType === thrift.TType.LIST) {
                        const value_20: Array<string> = new Array<string>();
                        const metadata_3: thrift.IThriftList = input.readListBegin();
                        const size_3: number = metadata_3.size;
                        for (let i_3: number = 0; i_3 < size_3; i_3++) {
                            const value_21: string = input.readString();
                            value_20.push(value_21);
                        }
                        input.readListEnd();
                        _args.commissioningDesks = value_20;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 17:
                    if (fieldType === thrift.TType.LIST) {
                        const value_22: Array<string> = new Array<string>();
                        const metadata_4: thrift.IThriftList = input.readListBegin();
                        const size_4: number = metadata_4.size;
                        for (let i_4: number = 0; i_4 < size_4; i_4++) {
                            const value_23: string = input.readString();
                            value_22.push(value_23);
                        }
                        input.readListEnd();
                        _args.keywords = value_22;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 18:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_24: Image.IImage = Image.ImageCodec.decode(input);
                        _args.trailImage = value_24;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 19:
                    if (fieldType === thrift.TType.BOOL) {
                        const value_25: boolean = input.readBool();
                        _args.optimisedForWeb = value_25;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 20:
                    if (fieldType === thrift.TType.BOOL) {
                        const value_26: boolean = input.readBool();
                        _args.commentsEnabled = value_26;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 21:
                    if (fieldType === thrift.TType.BOOL) {
                        const value_27: boolean = input.readBool();
                        _args.suppressRelatedContent = value_27;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        if (_args.assets !== undefined && _args.title !== undefined && _args.category !== undefined) {
            return {
                assets: _args.assets,
                activeVersion: _args.activeVersion,
                title: _args.title,
                category: _args.category,
                plutoProjectId: _args.plutoProjectId,
                duration: _args.duration,
                source: _args.source,
                posterUrl: _args.posterUrl,
                description: _args.description,
                metadata: _args.metadata,
                posterImage: _args.posterImage,
                trailText: _args.trailText,
                byline: _args.byline,
                commissioningDesks: _args.commissioningDesks,
                keywords: _args.keywords,
                trailImage: _args.trailImage,
                optimisedForWeb: _args.optimisedForWeb,
                commentsEnabled: _args.commentsEnabled,
                suppressRelatedContent: _args.suppressRelatedContent
            };
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read MediaAtom from input");
        }
    }
};
export class MediaAtom extends thrift.StructLike implements IMediaAtom {
    public assets: Array<Asset.IAsset>;
    public activeVersion?: thrift.Int64;
    public title: string;
    public category: Category.Category;
    public plutoProjectId?: string;
    public duration?: thrift.Int64;
    public source?: string;
    public posterUrl?: string;
    public description?: string;
    public metadata?: Metadata.IMetadata;
    public posterImage?: Image.IImage;
    public trailText?: string;
    public byline?: Array<string>;
    public commissioningDesks?: Array<string>;
    public keywords?: Array<string>;
    public trailImage?: Image.IImage;
    public optimisedForWeb?: boolean;
    public commentsEnabled?: boolean;
    public suppressRelatedContent?: boolean;
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IMediaAtomArgs) {
        super();
        if (args.assets != null) {
            const value_28: Array<Asset.IAsset> = new Array<Asset.IAsset>();
            args.assets.forEach((value_47: Asset.IAssetArgs): void => {
                const value_48: Asset.IAsset = new Asset.Asset(value_47);
                value_28.push(value_48);
            });
            this.assets = value_28;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[assets] is unset!");
        }
        if (args.activeVersion != null) {
            const value_29: thrift.Int64 = (typeof args.activeVersion === "number" ? new thrift.Int64(args.activeVersion) : typeof args.activeVersion === "string" ? thrift.Int64.fromDecimalString(args.activeVersion) : args.activeVersion);
            this.activeVersion = value_29;
        }
        if (args.title != null) {
            const value_30: string = args.title;
            this.title = value_30;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[title] is unset!");
        }
        if (args.category != null) {
            const value_31: Category.Category = args.category;
            this.category = value_31;
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Required field[category] is unset!");
        }
        if (args.plutoProjectId != null) {
            const value_32: string = args.plutoProjectId;
            this.plutoProjectId = value_32;
        }
        if (args.duration != null) {
            const value_33: thrift.Int64 = (typeof args.duration === "number" ? new thrift.Int64(args.duration) : typeof args.duration === "string" ? thrift.Int64.fromDecimalString(args.duration) : args.duration);
            this.duration = value_33;
        }
        if (args.source != null) {
            const value_34: string = args.source;
            this.source = value_34;
        }
        if (args.posterUrl != null) {
            const value_35: string = args.posterUrl;
            this.posterUrl = value_35;
        }
        if (args.description != null) {
            const value_36: string = args.description;
            this.description = value_36;
        }
        if (args.metadata != null) {
            const value_37: Metadata.IMetadata = new Metadata.Metadata(args.metadata);
            this.metadata = value_37;
        }
        if (args.posterImage != null) {
            const value_38: Image.IImage = new Image.Image(args.posterImage);
            this.posterImage = value_38;
        }
        if (args.trailText != null) {
            const value_39: string = args.trailText;
            this.trailText = value_39;
        }
        if (args.byline != null) {
            const value_40: Array<string> = new Array<string>();
            args.byline.forEach((value_49: string): void => {
                const value_50: string = value_49;
                value_40.push(value_50);
            });
            this.byline = value_40;
        }
        if (args.commissioningDesks != null) {
            const value_41: Array<string> = new Array<string>();
            args.commissioningDesks.forEach((value_51: string): void => {
                const value_52: string = value_51;
                value_41.push(value_52);
            });
            this.commissioningDesks = value_41;
        }
        if (args.keywords != null) {
            const value_42: Array<string> = new Array<string>();
            args.keywords.forEach((value_53: string): void => {
                const value_54: string = value_53;
                value_42.push(value_54);
            });
            this.keywords = value_42;
        }
        if (args.trailImage != null) {
            const value_43: Image.IImage = new Image.Image(args.trailImage);
            this.trailImage = value_43;
        }
        if (args.optimisedForWeb != null) {
            const value_44: boolean = args.optimisedForWeb;
            this.optimisedForWeb = value_44;
        }
        if (args.commentsEnabled != null) {
            const value_45: boolean = args.commentsEnabled;
            this.commentsEnabled = value_45;
        }
        if (args.suppressRelatedContent != null) {
            const value_46: boolean = args.suppressRelatedContent;
            this.suppressRelatedContent = value_46;
        }
    }
    public static read(input: thrift.TProtocol): MediaAtom {
        return new MediaAtom(MediaAtomCodec.decode(input));
    }
    public static write(args: IMediaAtomArgs, output: thrift.TProtocol): void {
        return MediaAtomCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return MediaAtomCodec.encode(this, output);
    }
}
