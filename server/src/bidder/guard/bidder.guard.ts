import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { USER_ROLES } from "src/utils/constants";


@Injectable()
export class BidderGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		console.log("user in bidder guard", user);
		const isBidCreator = user?.role == USER_ROLES.BIDDER;

		if (!isBidCreator) {
			throw new ForbiddenException({
				success: false,
				message: "Only a Bidder can perform this action",
			});
		}

		return true;
	}
}