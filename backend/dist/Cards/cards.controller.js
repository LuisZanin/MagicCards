"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const cards_service_1 = require("./cards.service");
const create_cards_dto_1 = require("./dto/create-cards.dto");
const import_deck_dto_1 = require("./dto/import-deck.dto");
const auth_guard_1 = require("../auth/auth.guard");
const auth_roles_guard_1 = require("../auth/roles/auth.roles.guard");
const auth_roles_decorator_1 = require("../auth/roles/decorator/auth.roles.decorator");
const auth_roles_enum_1 = require("../auth/roles/enum/auth.roles.enum");
let CardController = class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    async getMyDecks(req) {
        const userId = req.user.userId;
        return this.cardService.findDecksByPlayer(userId);
    }
    async createCards(createCardDto) {
        const { deckName } = createCardDto;
        if (!deckName || deckName.trim() === '') {
            throw new common_1.BadRequestException('Favor Inserir um nome para o Deck');
        }
        return this.cardService.create(deckName);
    }
    async importDeck(importDeckDto) {
        return this.cardService.importDeck(importDeckDto);
    }
    async viewAllDecks() {
        return this.cardService.viewAllDecks();
    }
};
exports.CardController = CardController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, cache_manager_1.CacheTTL)(120),
    (0, common_1.Get)('my-decks'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "getMyDecks", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cards_dto_1.CreateCardDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "createCards", null);
__decorate([
    (0, common_1.Post)('import'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [import_deck_dto_1.ImportDeckDto]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "importDeck", null);
__decorate([
    (0, common_1.Get)('viewAllDecks'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, auth_roles_guard_1.RolesGuard),
    (0, auth_roles_decorator_1.Roles)(auth_roles_enum_1.Role.Admin),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardController.prototype, "viewAllDecks", null);
exports.CardController = CardController = __decorate([
    (0, common_1.Controller)('card'),
    __metadata("design:paramtypes", [cards_service_1.CardService])
], CardController);
//# sourceMappingURL=cards.controller.js.map