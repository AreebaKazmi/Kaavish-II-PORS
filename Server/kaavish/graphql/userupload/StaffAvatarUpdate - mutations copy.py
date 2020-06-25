class UserAvatarUpdate(BaseMutation):
    user = graphene.Field(User, description="An updated user instance.")

    class Arguments:
        image = Upload(
            required=True,
            description="Represents an image file in a multipart request.",
        )

    class Meta:
        description = (
            "Create a user avatar. Only for staff members. This mutation must be sent "
            "as a `multipart` request. More detailed specs of the upload format can be "
            "found here: https://github.com/jaydenseric/graphql-multipart-request-spec"
        )
        error_type_class = AccountError
        error_type_field = "account_errors"

    @classmethod
    @staff_member_required
    def perform_mutation(cls, _root, info, image):
        user = info.context.user
        image_data = info.context.FILES.get(image)
        validate_image_file(image_data, "image")

        if user.avatar:
            user.avatar.delete_sized_images()
            user.avatar.delete()
        user.avatar = image_data
        user.save()
        create_user_avatar_thumbnails.delay(user_id=user.pk)

        return UserAvatarUpdate(user=user)




const staffAvatarUpdateMutation = gql`
  mutation StaffAvatarUpdate($image: Upload!) {
    userAvatarUpdate(image: $image) {
      errors {
        field
        message
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarUpdateMutation = TypedMutation<
  StaffAvatarUpdate,
  StaffAvatarUpdateVariables
>(staffAvatarUpdateMutation);

const staffAvatarDeleteMutation = gql`
  mutation StaffAvatarDelete {
    userAvatarDelete {
      errors {
        field
        message
      }
      user {
        id
        avatar {
          url
        }
      }
    }
  }
`;
export const TypedStaffAvatarDeleteMutation = TypedMutation<
  StaffAvatarDelete,
  StaffMemberDeleteVariables
>(staffAvatarDeleteMutation);



