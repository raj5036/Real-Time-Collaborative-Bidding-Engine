import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { USER_ROLES } from "src/utils/constants";


@Injectable()
export class BidCreatorGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		console.log("user in bid creator guard", user);
		const isBidCreator = user?.role == USER_ROLES.BID_CREATOR;

		if (!isBidCreator) {
			throw new ForbiddenException({
				success: false,
				message: "Only a Bid Creator can perform this action",
			});
		}

		return true;
	}
}