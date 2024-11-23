"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cards_service_1 = require("./cards.service");
const cards_controller_1 = require("./cards.controller");
const cards_schema_1 = require("./cards.schema");
const cache_manager_1 = require("@nestjs/cache-manager");
let CardModule = class CardModule {
};
exports.CardModule = CardModule;
exports.CardModule = CardModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: cards_schema_1.Cards.name, schema: cards_schema_1.CardSchema,
                }]),
            cache_manager_1.CacheModule.register()],
        providers: [cards_service_1.CardService],
        controllers: [cards_controller_1.CardController],
    })
], CardModule);
//# sourceMappingURL=cards.module.js.map