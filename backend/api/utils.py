from .models import ActionLog

def log_action(user, action, ip_address=None):
    ActionLog.objects.create(user=user, action=action, ip_address=ip_address)